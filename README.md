---

# 🌐 LEME — Plataforma SaaS de Reskilling Inclusivo com IA

O **LEME** é uma plataforma SaaS projetada para acelerar o *reskilling inclusivo* dentro de empresas. A solução utiliza **inteligência artificial acessível**, **gamificação híbrida** e **trilhas personalizadas** para apoiar colaboradores vulneráveis — como pessoas com deficiência, trabalhadores rurais e iniciantes em tecnologia — garantindo aprendizagem sem barreiras.

O projeto foi desenvolvido como entrega da disciplina **Software Engineering and Business Model** (FIAP).

🔗 **Repositório oficial:** [https://github.com/gsleme/Leme-IA](https://github.com/gsleme/Leme-IA)
▶️ *(Insira o vídeo pitch aqui quando estiver pronto)*

---

## 🚀 Tecnologias Utilizadas

### Frontend

* **React** (Vite + TypeScript)
* **Tailwind CSS** para responsividade e alto contraste
* **Web Speech API** (TTS)
* **react-libras** para acessibilidade em Libras
* **ESLint** para padronização

### Backend

* **Java (Quarkus)** para API REST
* **Python + Flask** para módulos de IA
* **APIs de acessibilidade** integradas

### Banco de Dados

* **Modelo relacional** com tabelas de Usuários, Books, Soft Skills e Adaptações

### Outros

* **PostCSS**
* **WAVE + Lighthouse** para auditoria de acessibilidade
* **Deploy** (a definir: Vercel / Render / Railway)

---

## 👥 Integrantes

| Nome                                    | RM      |
| --------------------------------------- | ------- |
| Felipe Ferrete Lemes                    | RM562999 |
| Gustavo Bosak Santos                    | RM566315 |
| Nikolas Henrique de Souza Lemes Brisola | RM564371 |

> 1TDSPF — ADS

---

## 💡 Sobre o Projeto

O LEME nasce para resolver um problema crescente: **70% dos trabalhadores precisarão de reskilling até 2030**, porém plataformas tradicionais não oferecem acessibilidade real.

A plataforma entrega:

* IA inclusiva que sugere trilhas personalizadas
* Gamificação híbrida focada em soft skills
* Recursos automáticos para deficientes visuais
* Design inclusivo desde o início
* Modelo de negócio SaaS acessível para empresas e ONGs

O objetivo é **reduzir desigualdades**, **aumentar empregabilidade** e **promover desenvolvimento contínuo**.

---

## 💼 Modelo de Negócio (Resumo)

* **SaaS B2B**: R$35 por usuário/mês
* **Subsídios via ONGs** para colaboradores vulneráveis
* **Contratos anuais com RH corporativo**
* **Relatórios de acessibilidade e inclusão**
* Uptime: **99% (SLA)**

---

## 📌 Execução (Ambiente Local)

### 1. Instalar dependências do frontend

```bash
npm install
npm run dev
```

### 2. Backend Java (Quarkus)

Rodar via IDE ou CLI:

```bash
./mvnw quarkus:dev
```

### 3. Backend Python (IA)

```bash
cd backend-ia
python -m venv venv
venv/Scripts/activate   # Windows
pip install -r requirements.txt
python app.py
```

---

## 🧩 Estrutura de Diretórios (Proposta)

```
LEME/
├── frontend/                # Aplicação React + Vite + TS
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── routes/
│   │   ├── context/
│   │   └── main.tsx
│   └── public/
│       └── media/
│
├── backend-quarkus/         # API REST principal
│   ├── src/main/java/
│   └── application.properties
│
├── backend-ia/              # Módulos Python de IA
│   ├── app.py
│   ├── models/
│   └── requirements.txt
│
└── README.md
```

---

## 🧠 Recursos de IA + Acessibilidade

* Sugestão automática de trilhas personalizadas
* Detecção de perfis vulneráveis
* Ativação de TTS para deficientes visuais
* Gamificação com métricas de soft skills
* Tradução automática com Libras
* UX writing inclusivo

---

## 📊 Mercado e Competidores

**Concorrentes diretos:** Coursera, Alura, Trybe
**Vantagens do LEME:**

* Inclusão real (IA adaptada + acessibilidade nativa)
* Gamificação híbrida de soft skills
* Modelo de subsídios para vulneráveis
* Foco corporativo com métricas de diversidade

---

## 🔗 Links do Projeto

📁 **Repositório:** [https://github.com/gsleme/Leme-IA](https://github.com/gsleme/Leme-IA)
▶️ **Pitch de Vendas:** *(inserir)*
🧪 **Protótipo Figma:** *(https://www.figma.com/design/gnVqfcD4u3jNBHSixpjfkx/Untitled?node-id=28-41&t=0hvaGaCtp72abBgS-1)*
📌 **Backlog (Trello / Jira):** *(https://www.notion.so/Backlog-da-Sprint-com-Checkboxes-Resumo-e-Observa-es-2316cd0b4d78801e85b1ceddda572c7e?source=copy_link)*

---
