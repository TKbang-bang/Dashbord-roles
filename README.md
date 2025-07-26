<body style="font-family: 'Segoe UI', sans-serif; line-height: 1.6; background-color: #f9f9f9; color: #333; padding: 2rem; max-width: 960px; margin: auto;">

  <h1 style="color: #e82525; font-size: 2.5rem; margin-bottom: 1rem;">🔐 Role-Based Dashboard (Backend-Focused)</h1>

  <p>This project is a role-based fullstack dashboard designed primarily to demonstrate backend skills such as session handling, authentication with tokens, secure role management, logging of sensitive actions, and Sequelize with PostgreSQL.</p>

  <div style="background-color: #fff4f4; border-left: 4px solid #e82525; padding: 1rem; margin: 1.5rem 0;">
    ⚠️ <strong>Note:</strong> The frontend is simple and not responsive, as the main goal is to showcase backend functionality and logic.
  </div>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">🚀 Main Features</h2>
  <ul>
    <li>User registration with roles: <code>viewer</code>, <code>moderator</code>, and <code>admin</code>.</li>
    <li>Login and secure logout with JWT tokens.</li>
    <li>Session management with access and refresh tokens.</li>
    <li>Role-based access control to products and users.</li>
    <li>Audit log that tracks moderator/admin actions (only visible to admin).</li>
  </ul>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">👤 Roles & Permissions</h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
    <thead>
      <tr style="background-color: #e82525; color: white;">
        <th style="padding: 0.5rem; border: 1px solid #ccc;">Role</th>
        <th style="padding: 0.5rem; border: 1px solid #ccc;">Product Access</th>
        <th style="padding: 0.5rem; border: 1px solid #ccc;">User Access</th>
        <th style="padding: 0.5rem; border: 1px solid #ccc;">Log Access</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">Viewer</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">View products</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">No</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">No</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">Moderator</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">View & create products</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">View non-admin/mod users</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">No</td>
      </tr>
      <tr>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">Admin</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">Full product CRUD</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">Full access</td>
        <td style="padding: 0.5rem; border: 1px solid #ccc;">Yes</td>
      </tr>
    </tbody>
  </table>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">🗂️ Tech Stack</h2>
  <h3>Frontend:</h3>
  <ul>
    <li>React</li>
    <li>React Router DOM</li>
    <li>Axios</li>
    <li><code>VITE_BACKEND_URL</code> (env)</li>
  </ul>

  <h3>Backend:</h3>
  <ul>
    <li>Node.js, Express</li>
    <li>bcrypt, cors, cookie-parser, dotenv, jsonwebtoken, multer</li>
    <li>pg, pg-hstore, sequelize</li>
  </ul>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">🧠 Auth & Session Flow</h2>
  <ol>
    <li>User logs in and receives:
      <ul>
        <li><code>accessToken</code> in JSON</li>
        <li><code>refreshToken</code> in httpOnly cookie</li>
      </ul>
    </li>
    <li>Frontend stores <code>accessToken</code> in memory (not localStorage)</li>
    <li>Axios interceptors handle auto-refresh and error redirection</li>
    <li>Backend middleware validates access token or generates new ones if expired</li>
  </ol>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">🧾 Database Tables</h2>
  <ul>
    <li><strong>Users</strong>: <code>user_id, firstname, lastname, email, password, role, createdAt, updatedAt</code></li>
    <li><strong>Products</strong>: <code>product_id, name, path, createdAt, updatedAt</code></li>
    <li><strong>AuditLogs</strong>: <code>log_id, action, user_id, affected_id, table_affected, createdAt, updatedAt</code></li>
  </ul>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">⚙️ Environment Variables</h2>
  <h3>Backend (.env):</h3>
  <pre style="background: #f4f4f4; padding: 1rem; border-left: 4px solid #e82525;"><code>PORT=3001
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
DB_HOST=localhost

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

ADMIN_CODE=admin_secret
MODERATOR_CODE=moderator_secret</code></pre>

  <h3>Frontend (.env):</h3>
  <pre style="background: #f4f4f4; padding: 1rem; border-left: 4px solid #e82525;"><code>VITE_BACKEND_URL=http://localhost:3001</code></pre>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">📦 Run Instructions</h2>
  <h3>Backend:</h3>
  <pre style="background: #f4f4f4; padding: 1rem; border-left: 4px solid #e82525;"><code>cd backend
npm install
npx sequelize db:migrate
npm run dev</code></pre>

  <h3>Frontend:</h3>
  <pre style="background: #f4f4f4; padding: 1rem; border-left: 4px solid #e82525;"><code>cd frontend
npm install
npm run dev</code></pre>

  <h2 style="color: #e82525; border-bottom: 2px solid #e82525; padding-bottom: 0.3rem;">✅ Project Status</h2>
  <ul>
    <li>✔️ Full backend auth and session handling</li>
    <li>✔️ Secure role-based access</li>
    <li>✔️ Logging system in place</li>
    <li>❌ Frontend not responsive (intentionally)</li>
  </ul>

  <h2 style="color: #e82525;">📬 Contact</h2>
  <p>For more projects or questions, visit my <a href="https://woodleytk-portfolio.onrender.com/" style="color: #e82525;">portfolio</a> or email me at <a href="tklavensky@gmail.com" style="color: #e82525;"><h3>Woodley TK</h3></a>.</p>

</body>
