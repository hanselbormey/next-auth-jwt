import * as React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const Settings: NextPage = () => {
  const { data, error } = useSWR('/api/admin/settings', fetcher);

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h3>Admin Settings</h3>
      {<div>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default Settings;

/* export async function getServerSideProps(context) {
  const cookie = context.req?.headers.cookie;
  const response = await fetch('http://localhost:3000/api/admin/settings', {
    headers: {
      cookie: cookie!
    }
  });
  //  const response = await fetch('http://localhost:3000/api/admin/settings');
  console.log(response);

  const json = await response.json();
  const json = JSON.stringify(response);

  return {
    props: {
      settings: json
    } // will be passed to the page component as props
  };
} */
