## OpenAPI генерация

- DApp API документация: https://api.qubicat.ru/swagger-ui/index.html
- RT-Pay API: https://dev-back-rt-pay.qubicat.ru/api/v1/swagger/index.html#/

### Генерация клиента

```bash
npx openapi --input ./src/shared/api/openapi/index.json \
  --output ./src/shared/api/client \
  --client axios \
  --use-union-types true
```

Клиент будет перегенерирован в папке `src/shared/api/client`. После генерации рекомендуется проверить типы и, при необходимости, расширить `useDappApi`, если в спецификации появились новые эндпоинты или дополнительные параметры безопасности.


