import { useNavigate, useSearchParams } from "react-router";
import Dashboard from "../dashboard/Dashboard";
import { BASE_URL } from "~/constans";
import { metaCommon } from "~/lib/utils";

export const meta = () => metaCommon('Home');

export default function Home() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = params.get('redirect');

  if (redirectUrl) {
    void navigate(BASE_URL + redirectUrl.replace(/^[\/]*/g, ''));
    return null;
  }

  return (
    <Dashboard />
  )
}
