export default function verifyMail(mail: string):boolean {
  const regexMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regexMail.test(mail);
}
