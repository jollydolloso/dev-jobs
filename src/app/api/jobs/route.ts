import { NextResponse } from 'next/server';

let jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    stack: ['React', 'TypeScript', 'Tailwind'],
    description: 'Work on modern UI using React and Tailwind CSS.',
  },
  {
    id: 2,
    title: 'Fullstack Engineer',
    company: 'DevHouse',
    location: 'San Francisco, CA',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    description: 'Build fullstack web apps with modern tooling.',
  },
];

export async function GET() {
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newJob = { ...body, id: Date.now() };
  jobs.push(newJob);
  return NextResponse.json(newJob);
}

export async function PUT(req: Request) {
  const body = await req.json();
  jobs = jobs.map(job => (job.id === body.id ? body : job));
  return NextResponse.json(body);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  jobs = jobs.filter(job => job.id !== id);
  return NextResponse.json({ success: true });
}