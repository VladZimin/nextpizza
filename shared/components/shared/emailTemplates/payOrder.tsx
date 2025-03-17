
interface Props {
  paymentUrl: string;
  orderId: number;
  totalAmount: number;
}

export const PayOrderTemplate = ({ paymentUrl, orderId, totalAmount }: Props) => (
  <div>
    <h1>Заказ #${orderId}</h1>

    <p>
      Оплатите заказ на сумму <b>{totalAmount} ₽.</b>
      Перейдите <a href={paymentUrl}>по ссылке</a> для оплаты заказа.
    </p>
  </div>
);