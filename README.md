# ⚡ Niuro IOT Challenge

Bienvenido al desafío técnico de **Niuro IOT**. Sigue estos pasos para configurar tu entorno local y poner en marcha la aplicación en cuestión de minutos.

---

## 🛠 Requisitos Previos

Antes de comenzar, asegúrate de cumplir con las versiones mínimas de entorno. Puedes verificarlas ejecutando los siguientes comandos en tu terminal:

| Herramienta | Versión Mínima | Comando de Verificación |
| :--- | :--- | :--- |
| **Node.js** | `v22.14.0` | `node -v` |
| **npm** | `v10.9.2` | `npm -v` |

---

## 🚀 Guía de Instalación Rápida

Sigue este flujo de trabajo para inicializar el proyecto:

### 1️⃣ Descarga del Proyecto
Haz clic en el siguiente enlace para obtener el código fuente:  
👉 [**Descargar NiuroChallenge (ZIP)**](https://github.com/Bushogun/Niuroapp/archive/refs/heads/main.zip)

### 2️⃣ Extracción y Preparación
- Localiza el archivo descargado.
- Haz **clic derecho** ➔ **Extraer aquí** (o usa tu gestor de archivos preferido).
- Abre la carpeta resultante `Niuroapp-main` en **Visual Studio Code**.

### 3️⃣ Ejecución del Proyecto
Abre una terminal integrada en VS Code (`CTRL` + `SHIFT` + `Ñ` o `` CTRL `` + `` ` ``) y ejecuta los siguientes comandos:

```bash
# Instalar las dependencias del proyecto
npm install

# Iniciar el servidor de desarrollo
npm run dev

```

### 1. Email HTML (Diseño de Alerta)
El diseño del correo electrónico prioriza la legibilidad inmediata y la acción rápida del operador.

> **Nota:** El diseño visual se puede encontrar en: `public/mail.jpeg`

#### Consideraciones de Diseño y Negocio:
* **Jerarquía Visual:** Uso de colores semafóricos (Rojo para peligro, Verde para óptimo) para que el usuario identifique la gravedad antes de leer el texto.
* **Identificación del Activo:** Incluye el nombre de la máquina y su ID de forma destacada para evitar confusiones en plantas con múltiples equipos.
* **Llamada a la Acción (CTA):** Un botón claro de "Ver Detalles" que redirige directamente a la sección de la máquina afectada.
* **Responsividad:** Código HTML basado en tablas (estándar para clientes de correo como Outlook) para asegurar que se vea bien tanto en móviles como en escritorio.
* **Contexto de Negocio:** Se incluye la hora exacta del evento para trazabilidad en auditorías de mantenimiento.

---

### 2. WhatsApp (Formato Directo)
Para WhatsApp, se busca un formato conciso que permita una lectura rápida en la pantalla de bloqueo.

**Ejemplo de formato:**
```text
⚠ *Alerta crítica Niuro*

*Máquina:* Compresor A12
*Estado:* Peligro 🔴
*Hora:* 18:25

🔗 *Ver detalles:* [https://app.niuro.com/machine/42](https://app.niuro.com/machine/42)