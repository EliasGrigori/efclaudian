# Como publicar o EFClaudian (dá para fazer só pelo celular)

Este pacote tem tudo o que vai para o endereço do app:

| Arquivo | O que é |
|---|---|
| `index.html` | o app (a mesma versão `EFClaudian-vX.html` (até a v2.70: `EFClaudian.tec-vX.html`), só com o nome trocado) |
| `sw.js` | guarda a tela no aparelho para abrir **sem internet** |
| `manifest.webmanifest` | nome, cores e ícones para **instalar** como app |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | ícones do EFClaudian (lupa com broto) |

Os seis arquivos precisam ficar **juntos, na mesma pasta**, num endereço **https**.

---

## Caminho recomendado: GitHub Pages (grátis, funciona no navegador do celular)

1. No Chrome do celular, abra **github.com**, crie uma conta, se ainda não tiver, e entre.
2. Toque em **+** › **New repository**. Nome: `efclaudian`. Deixe **Public** e toque em **Create repository**.
   - O app não guarda senha nem dados no código. Os dados ficam no Firebase, protegidos pelas regras.
   - As chaves do Firebase que aparecem no código são públicas por natureza.
3. Na página do repositório, toque em **Add file** › **Upload files**.
   - Escolha os **seis arquivos** deste pacote e toque em **Commit changes**.
4. Toque em **Settings** › **Pages**. Em **Branch**, escolha `main` e `/ (root)` e toque em **Save**.
5. Espere 1 a 2 minutos. O endereço aparece no topo da página, no formato `https://SEU-USUARIO.github.io/efclaudian/`.
6. **Autorize o endereço no Firebase**, senão o login não funciona:
   - abra **console.firebase.google.com** › projeto **docseliasflorencio**;
   - vá em **Authentication** › **Settings** › **Authorized domains** › **Add domain**;
   - digite `SEU-USUARIO.github.io` e salve.
7. Abra o endereço no Chrome. Depois vá em **Opções** › **Instalar o app neste aparelho**, ou no menu ⋮ › **Instalar app**.

### Para publicar uma versão nova

1. Renomeie o arquivo novo `EFClaudian-vX.html` para `index.html`.
2. No repositório, toque em **Add file** › **Upload files**, envie o `index.html` e toque em **Commit changes**. Ele substitui o anterior.
3. Se a entrega trouxer um `sw.js` novo, envie ele também. É o `sw.js` que faz aparecer o aviso **"Versão nova pronta — toque para atualizar"** em quem já tem o app instalado.
   - Se a entrega não trouxer `sw.js`, abra o `sw.js` no próprio GitHub (ícone de lápis) e troque o número em `VERSAO`.

---

## Outros caminhos (precisam de computador)

- **Firebase Hosting** (mesmo projeto do Firebase, endereço `docseliasflorencio.web.app`, sem autorizar domínio): precisa do programa `firebase-tools` num computador (`firebase init hosting` e `firebase deploy`).
- **Netlify Drop** (app.netlify.com/drop): arraste a pasta com os seis arquivos. O endereço gerado também precisa ser autorizado no Firebase (passo 6).

## Conferir depois de publicar

- O login funciona. Se não funcionar, falta o passo 6.
- **Opções** mostra **Instalar o app neste aparelho**. Depois de instalado, ali passa a aparecer "Instalado neste aparelho".
- Para testar sem internet: ponha o celular em modo avião e abra o app instalado. Ele abre, mostra o que já estava carregado e sincroniza quando a internet voltar.
