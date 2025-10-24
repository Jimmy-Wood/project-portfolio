export default function Layout(props) {
    const { children } = props;

    const header = (
        <header>
            <h1 className="text-medium text-gradient">
                Age Calculator
            </h1>
        </header>
    )

    const footer = (
        <footer className="">
            <small>Created by</small>
            <a href="https://www.linkedin.com/in/jhwood/" target="_blank"> <img src="https://media.licdn.com/dms/image/v2/C5603AQHu3JHMgofvOg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1532597313945?e=1762387200&v=beta&t=AIkyYe1QGNa__m5IzyYan7huN-VXqQ4g6vYBbBH10Jw" alt="profile_picture"/>
            <p>James Wood</p>
            <i className="fa-brands fa-linkedin-in"></i>
            </a>
        </footer>
    )

    return (
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}