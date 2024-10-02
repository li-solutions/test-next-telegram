import {useEffect} from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
const botName= process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME as string;
export default function TelegramLogin() {

    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?19';
      script.setAttribute('data-telegram-login', botName);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-auth-url', `${BASE_URL}/api/auth/telegram`);
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-size','large');
      script.setAttribute('data-radius','5');
      script.setAttribute('data-shape','rect');
      document.getElementById('telegram-login')?.appendChild(script);
    }, []);

    return <div id="telegram-login"></div>;
}