import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { what_to_automate, platform, timeline, email } = body;

    // Validate all fields are present and non-empty strings
    if (
      typeof what_to_automate !== 'string' || !what_to_automate.trim() ||
      typeof platform !== 'string' || !platform.trim() ||
      typeof timeline !== 'string' || !timeline.trim() ||
      typeof email !== 'string' || !email.trim()
    ) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Validate email contains '@'
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Validate max 1000 chars per field
    if (
      what_to_automate.length > 1000 ||
      platform.length > 1000 ||
      timeline.length > 1000 ||
      email.length > 1000
    ) {
      return NextResponse.json({ error: 'Each field must be under 1000 characters.' }, { status: 400 });
    }

    // Rate limit: check for existing submission from same email in last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from('contact_requests')
      .select('id')
      .eq('email', email)
      .gt('created_at', since)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Please wait before submitting again.' },
        { status: 429 }
      );
    }

    // Insert into contact_requests
    const { error: insertError } = await supabase
      .from('contact_requests')
      .insert({
        what_to_automate: what_to_automate.trim(),
        platform: platform.trim(),
        timeline: timeline.trim(),
        email: email.trim(),
        status: 'new',
      });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
