import { getRequestConfig } from 'next-intl/server';
import { routing } from './routingConfig';
import { IntlErrorCode } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
        onError(error) {
            if (error.code === IntlErrorCode.MISSING_MESSAGE) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                console.warn(`[next-intl] Missing translation for key: "${(error as any).path}" in locale: "${locale}"`);
            } else {
                console.error(error);
            }
        },
        getMessageFallback({ namespace, key }) {
            const path = [namespace, key].filter((part) => part != null).join('.');
            return `MISSING: ${path}`;
        }
    };
});
