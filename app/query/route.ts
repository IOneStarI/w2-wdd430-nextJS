import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is not set');
}

const sql = postgres(connectionString, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
