import AuthForm from '../../components/AuthForm'

export default function Signup() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl">Sign Up</h1>
      <AuthForm mode="signup" />
    </div>
  )
}
