  # Gestión Financiera
  Aplicación full-stack para la gestión de ingresos, egresos y reportes. Contiene un Back-End en Python (Flask + SQLAlchemy) que expone una API REST y un Front-End en React para la interfaz de usuario.


  ## Descripción
  Esta aplicación permite registrar usuarios, crear ingresos y egresos, consultar historial y generar reportes. El Back-End gestiona la lógica, persistencia y envío de correos; el Front-End es una SPA en React que consume la API.

## Estructura del repositorio
- `Back-End/` - API y lógica del servidor (Flask)
  - `app.py` - Punto de entrada de la aplicación Flask
  - `config.py` - Configuraciones de la aplicación
  - `requirements.txt` - Dependencias Python
  - `models/` - Modelos: `ingreso.py`, `egreso.py`, `usuario.py`, `reportes.py`
  - `routes/` - Rutas de la API
  - `templates/` - Plantillas HTML (emails)
  - `utils/db.py` - Conexión/ayudas para la base de datos

- `Front-End/` - Aplicación cliente creada con React
  - `package.json` - Dependencias y scripts


  ## Estructura del proyecto

  - `Back-End/` — API y lógica del servidor (Flask)
    - `app.py` — punto de entrada y registro de blueprints
    - `config.py` — configuración de la app (DB, secret key)
    - `requirements.txt` — dependencias Python
    - `models/` — modelos SQLAlchemy (`ingreso.py`, `egreso.py`, `usuario.py`, `reportes.py`)
    - `routes/` — blueprints y endpoints
    - `templates/` — plantillas HTML para emails
    - `utils/db.py` — inicialización de SQLAlchemy

  - `Front-End/` — Aplicación cliente (React)
    - `package.json` — scripts y dependencias
    - `public/` — archivos estáticos
    - `src/` — componentes, rutas y estilos React

  ## Requisitos

  - Node.js (>= 14) y npm o yarn
  - Python 3.8+ y pip
  - Una base de datos (Postgres, SQLite para desarrollo)

  ## Variables de entorno recomendadas (Back-End)

  Recomendado crear `Back-End/.env` (o definir variables en el entorno):

  - `SECRET_KEY` — clave secreta de Flask
  - `DATABASE_URL` — URL de la base de datos (ej.: `postgresql://user:pass@host/dbname` o `sqlite:///db.sqlite`)
  - `MAIL_USERNAME`, `MAIL_PASSWORD` — credenciales del servidor SMTP (usar app password o servicio de envío)
  - `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USE_TLS` — configuración SMTP

  No incluyas credenciales reales en el código ni en el control de versiones.

  ## Cómo ejecutar (Windows PowerShell)

  1) Back-End (Flask)

  ```powershell
  cd Back-End
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  # Crear un .env con las variables necesarias antes de iniciar
  python app.py
  ```

  Nota: si prefieres usar el CLI de Flask en lugar de ejecutar `app.py`, exporta `FLASK_APP=app.py` y usa `flask run`.

  2) Front-End (React)

  ```powershell
  cd Front-End
  npm install
  npm start
  ```

  Por defecto la app de React corre en `http://localhost:3000`.



