import Link from 'next/link';

import { useAuth } from '@/lib/auth';

const Header = () => {
  const { session, logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Link href="/">
        <h4>NEXT AUTH JWT EXAMPLE</h4>
      </Link>

      <div>
        <Link href="/settings">Settings</Link>
      </div>
      <div>
        {session ? (
          <div style={{ display: 'flex' }}>
            <p>{session.user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button>
            <Link href="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
