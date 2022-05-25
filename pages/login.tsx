import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

const Login: NextPage<{
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>,
}> = ({ providers }) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push('/')
  }

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <input type='image' src='kakao_login_medium_narrow.png' onClick={() => signIn(provider.id)} />
        </div>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default Login
