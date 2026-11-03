import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  Text,
  globalTokens,
} from '@repo/stylex-ui';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You don&apos;t have permission to access this resource.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Text
            tone="muted"
            style={{
              marginBottom: globalTokens.space4,
            }}
          >
            Please contact your administrator if you believe this is an error.
          </Text>

          <Button asChild>
            <Link href="/admin">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
