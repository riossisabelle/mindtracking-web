export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,12}$/;
export function isAsciiOnly(value: string): boolean {
  return /^[\x00-\x7F]*$/.test(value);
}

export function validateEmail(valueRaw: string): string | null {
  const value = valueRaw.trim();

  // Verificações básicas
  if (!value) return "E-mail é obrigatório";
  if (!isAsciiOnly(valueRaw)) return "Caracteres inválidos: apenas ASCII (sem emoji)";
  if (/[\s]/.test(valueRaw)) return "E-mail não pode conter espaços";
  if (value.length > 254) return "E-mail muito longo";

  // Verifica quantidade de '@'
  const atCount = (value.match(/@/g) || []).length;
  if (atCount !== 1) return "E-mail deve conter exatamente um '@'";

  const [local, domain] = value.split("@");
  if (!local || !domain) return "Formato de e-mail inválido";

  // Regras da parte local
  if (local.length > 64) return "Parte local do e-mail é muito longa";
  if (!/^[A-Za-z0-9._%+-]+$/.test(local)) return "Caracteres inválidos na parte local";
  if (local.startsWith(".") || local.endsWith(".")) return "Parte local não pode iniciar/terminar com ponto";
  if (local.includes("..")) return "Parte local não pode conter '..'";

  // Regras do domínio
  if (domain.length > 255) return "Domínio do e-mail é muito longo";
  if (!/^[A-Za-z0-9.-]+$/.test(domain)) return "Caracteres inválidos no domínio";
  if (!domain.includes(".")) return "Domínio deve conter ponto";
  if (domain.includes("..")) return "Domínio não pode conter '..' ou mais de um ponto";

  const labels = domain.split(".");
  if (labels.some((l) => l.length === 0)) return "Domínio inválido";
  for (const label of labels) {
    if (label.length < 1 || label.length > 63) return "Cada rótulo do domínio deve ter 1–63 caracteres";
    if (!/^[A-Za-z0-9-]+$/.test(label)) return "Domínio possui caracteres inválidos";
    if (label.startsWith("-") || label.endsWith("-")) return "Rótulos do domínio não podem iniciar/terminar com '-'";
  }

  const tld = labels[labels.length - 1];
  if (!/^[A-Za-z]{2,63}$/.test(tld)) return "TLD inválido (apenas letras, 2–63)";

  // Lista de domínios permitidos (em minúsculas)
  const allowedDomains = new Set([
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com.br",
    "terra.com.br",
    "uol.com.br",
  ]);

  if (!allowedDomains.has(domain.toLowerCase())) {
    return "Este não é um domínio permitido";
  }

  // Se passou por todas as validações, retorna null
  return null;
}

export function validatePassword(password: string, confirm: string): string | null {
  if (!password || !confirm) return "Preencha todos os campos";
  if (!isAsciiOnly(password)) return "A senha não pode conter emoji";
  if (password.length < 8) return "A senha deve ter no mínimo 8 caracteres";
  if (password.length > 20) return "A senha deve ter no máximo 20 caracteres";
  if (!passwordRegex.test(password))
    return "A senha deve incluir letra maiúscula, minúscula, número e caractere especial";
  if (password !== confirm) return "As senhas não coincidem";
  return null;
}