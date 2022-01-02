import Link from 'next/link';

export type IsAuthProps = {};

function IsAuth({}: IsAuthProps) {
  return (
    <Link href="/signup">
      <p className="mt-8">
        Need an account?{' '}
        <a href="#" className="text-regal-sky hover:text-sky-600 font-semibold">
          Create an account
        </a>
      </p>
    </Link>
  );
}

export default IsAuth;
