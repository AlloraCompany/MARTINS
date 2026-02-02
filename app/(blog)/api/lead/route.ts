import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Campos são obrigatórios" },
        { status: 400 }
      );
    }


    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Nome: name,
            Email: email,
            Numero: phone,
          },
        }),
      }
    );

    const data = await airtableResponse.json();

    if (!airtableResponse.ok) {
      return NextResponse.json(
        { success: false, error: data },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
