
interface Props {
  code: string;
}

export const VerificationUserTemplate = ({ code }: Props) => (
  <div>
    <h1>Код подтверждения: <b>{code}</b></h1>
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>
);