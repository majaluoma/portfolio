type BlockViewProps = {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'white';
  className?: string;
};

export default function BlockView({
  children,
  variant = 'default',
  className = '',
}: Readonly<BlockViewProps>) {
  const variantClasses = (variant: string) => {
    const shadow = 'shadow-2xl shadow-black';

    switch (variant) {
      case 'default':
        return '';
      case 'primary':
        return 'bg-primary' + ' ' + shadow;
      case 'secondary':
        return 'bg-secondary' + ' ' + shadow;
      case 'white':
        return 'bg-white shadow-2xl shadow-black' + ' ' + shadow;
    }
  };

  return (
    <div
      className={`w-screen ${variantClasses(variant)} m-12 flex items-center justify-center p-8 ${className}`}
    >
      <div
        className={`w-[22rem] items-center justify-center sm:w-[26rem] md:w-[40rem] lg:w-[59rem]`}
      >
        {children}
      </div>
    </div>
  );
}
