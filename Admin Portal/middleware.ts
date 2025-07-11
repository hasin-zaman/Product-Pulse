import { NextResponse } from 'next/server'

export default function protectedRouting(req: any) {
    const verify = req.cookies.get('accessToken');

    if(!verify && req.url.includes('http://localhost:3000/portal')) {
        return NextResponse.redirect('http://localhost:3000/');
    }

    if(verify && req.url == 'http://localhost:3000/') {
        return NextResponse.redirect('http://localhost:3000/portal');
    }
}