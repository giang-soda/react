import { LoginForm } from '~/components/features/auth/LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export default function Login() {
  return (
    <>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">Login</CardTitle>
          <CardDescription>
            Enter your email and password below to <br />
            log into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
}
