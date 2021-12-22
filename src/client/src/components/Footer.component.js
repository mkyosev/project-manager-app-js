function Footer() {
    return (
        <footer className="page-footer">
            <div className="footer-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="mb-0 text-muted">Project Manager &copy; {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;