import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function GET(request: Request, { params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params;
  const { page } = resolvedParams;

  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const pageUrl = `${protocol}://${host}/${page}`;
  const isLocal = process.env.NODE_ENV === 'development';

  try {
    let executablePath: string = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    let launchArgs: string[] = [];

    if (!isLocal) {
      executablePath = await chromium.executablePath();
      launchArgs = chromium.args;
    }

    const browser = await puppeteer.launch({
      args: launchArgs,
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: executablePath,
      headless: true,
    });

    const browserPage = await browser.newPage();
    await browserPage.goto(pageUrl, {
      waitUntil: 'networkidle0',
    });

    const pdfBytes = await browserPage.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    });

    await browser.close();

    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${page}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return new NextResponse('Erro ao gerar o PDF', { status: 500 });
  }
}
