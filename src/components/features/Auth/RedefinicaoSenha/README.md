# Componente de Redefinição de Senha - Autônomo

Este componente gerencia todo o fluxo de redefinição de senha de forma autônoma, sem depender de estados externos.

## Como Usar

### 1. Importação

```tsx
import RedefinicaoSenhaFlow from "@/components/features/Auth/RedefinicaoSenha";
```

### 2. Uso Básico

```tsx
function MeuComponente() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Redefinir Senha</button>

      <RedefinicaoSenhaFlow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          console.log("Senha redefinida com sucesso!");
          // Aqui você pode fazer o que quiser após a redefinição
        }}
      />
    </>
  );
}
```

### 3. Uso com Callback de Sucesso

```tsx
<RedefinicaoSenhaFlow
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSuccess={() => {
    // Redirecionar para login
    router.push("/login");

    // Ou mostrar mensagem de sucesso
    toast.success("Senha redefinida com sucesso!");

    // Ou qualquer outra ação
  }}
/>
```

## Props

| Prop        | Tipo         | Obrigatório | Descrição                                                     |
| ----------- | ------------ | ----------- | ------------------------------------------------------------- |
| `isOpen`    | `boolean`    | ✅          | Controla se o fluxo está aberto                               |
| `onClose`   | `() => void` | ✅          | Callback chamado quando o usuário fecha o fluxo               |
| `onSuccess` | `() => void` | ❌          | Callback opcional chamado quando a redefinição é bem-sucedida |

## Fluxo Interno

1. **Email** → Usuário digita o email
2. **Código** → Usuário digita o código de verificação
3. **Senha** → Usuário define nova senha
4. **Sucesso** → Chama `onSuccess` e fecha o fluxo

## Vantagens

- ✅ **Autônomo**: Não depende de estados externos
- ✅ **Reutilizável**: Pode ser usado em qualquer lugar
- ✅ **Simples**: Apenas 3 props necessárias
- ✅ **Flexível**: Callback de sucesso opcional
- ✅ **Consistente**: Mesmo comportamento em toda a aplicação
