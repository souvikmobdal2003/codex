import os
import sqlite3
from flask import Flask, request, redirect, send_file, render_template_string

app = Flask(__name__, static_folder="static", static_url_path="/static")

# ---------- Initialize SQLite DB ----------
def init_db():
    conn = sqlite3.connect('feedback.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            rating INTEGER NOT NULL,
            comments TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# ---------- Main Route ----------
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            name = request.form['name']
            email = request.form['email']
            rating = request.form['rating']
            comments = request.form['comments']

            conn = sqlite3.connect('feedback.db')
            c = conn.cursor()
            c.execute("INSERT INTO feedback (name, email, rating, comments) VALUES (?, ?, ?, ?)",
                      (name, email, rating, comments))
            conn.commit()
            conn.close()
        except Exception as e:
            print("❌ Error saving feedback:", e)

        return redirect('/')

    # Fetch feedbacks
    conn = sqlite3.connect('feedback.db')
    c = conn.cursor()
    c.execute("SELECT name, rating, comments FROM feedback ORDER BY id DESC")
    feedbacks = c.fetchall()
    conn.close()

    # Load HTML file
    html_path = os.path.join(os.path.dirname(__file__), "index.html")
    with open(html_path, 'r', encoding='utf-8') as file:
        html = file.read()

    # Inject feedback into HTML
    feedback_html = ""
    for name, rating, comments in feedbacks:
        stars = "⭐" * int(rating) if str(rating).isdigit() else ""
        feedback_html += f'''
            <div class="card p-3 my-2">
                <div><strong>NAME:</strong> {name}</div>
                <div><strong>COMMENTS:</strong> {comments}</div> 
                <div><strong>RATINGS:</strong> {stars}</div>
            </div>
        '''

    full_html = html.replace("<!--FEEDBACK_LIST-->", feedback_html)
    return render_template_string(full_html)

# ---------- Skill Page Route ----------
@app.route('/skill')
def skill():
    try:
        skill_path = os.path.join(os.path.dirname(__file__), "templates", "skill.html")
        with open(skill_path, "r", encoding="utf-8") as f:
            content = f.read()
        return render_template_string(content)
    except Exception as e:
        return f"Error loading skill page: {e}"

# ---------- Static Files ----------
@app.route('/static/<path:path>')
def static_files(path):
    return app.send_static_file(path)

# ---------- Run App ----------
if __name__ == '__main__':
    init_db()
    print("🟢 Running on http://127.0.0.1:5000/")
    app.run(debug=True)
