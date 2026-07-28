const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sbgbxmqrmghfaftkyqdo.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2J4bXFybWdoZmFmdGt5cWRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTI1MTI5MSwiZXhwIjoyMTAwODI3MjkxfQ.PqVOgBhLSJktrYWLB7TrtxOCO5TFqPVQHLSrY6nbhIQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing SQL execution...");
  
  // Method 1: Try an rpc call that might not exist, but let's see what happens.
  const { data, error } = await supabase.rpc('execute_sql', { sql: 'SELECT 1;' });
  console.log("RPC execute_sql:", { data, error });

  // Method 2: See if we can insert into a table that doesn't exist, just to confirm connection.
  const { error: insertErr } = await supabase.from('trips').select('*').limit(1);
  console.log("trips table check:", insertErr?.message || "exists");
}

test();
