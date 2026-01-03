function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-neutral-200 bg-white">
      <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Creative Showcase. Built for Artists.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
