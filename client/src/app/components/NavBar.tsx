import '@/app/styles/navbar.css'

export default function NavBar() {
    return (
        <html><body>
            <main>
                <div className="topbar"> 
                    <div className="nav-links"> 
                        <a href="#">Dashboard</a> 
                        <a href="#">Trades</a> 
                        <a href="#">Watchlist</a> 
                        <a href="#">Settings</a> 
                        </div> 
                        <a href="#" className="logout">Logout</a>
                    </div>
            </main>
        </body></html>
    );
}
