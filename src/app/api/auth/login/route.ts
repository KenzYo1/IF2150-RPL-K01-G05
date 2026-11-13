import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface LoginRequest {
    email?: string;
    password?: string;
}

export async function POST(request: Request) {
    let body: LoginRequest;

    try {
        body = (await request.json()) as LoginRequest;
    } catch {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "INVALID_JSON_BODY",
                    message: "Request body harus berupa JSON yang valid",
                },
            },
            { status: 400 }
        );
    }

    if (!body.email || !body.password) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "INVALID_LOGIN_CREDENTIALS",
                    message: "Email dan password wajib diisi",
                },
            },
            { status: 400 }
        );
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
    });

    if (error || !data.user) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: "INVALID_LOGIN_CREDENTIALS",
                    message: error?.message ?? "Email atau password salah",
                },
            },
            { status: 401 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            data: {
                userId: data.user.id,
                email: data.user.email,
            },
            message: "Login berhasil",
        },
        { status: 200 }
    );
}
