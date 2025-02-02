import './FooterStyles.css';

const Copyright = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="copyright">
            <p>© {currentYear} STATS. Todos los derechos reservados.</p>
        </div>
    );
}

export default Copyright;
