import { useRouteError } from "react-router-dom";

export const ErrorVerify = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, there was a small problem with verifying your account.</p>
      <p>Please contact your system adminsitrator if this results in you to be unable to login.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
