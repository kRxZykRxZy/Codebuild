import AuthForm from '../../components/AuthForm'

export default function Login() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl">Login</h1>
      <AuthForm mode="login" />
    </div>
  )
}
