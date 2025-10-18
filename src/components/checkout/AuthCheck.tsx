import { useState } from 'react';
import { LogIn, UserPlus, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AuthCheckProps {
  isAuthenticated: boolean;
  onNext: () => void;
  loading?: boolean;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  acceptTerms: boolean;
}

export const AuthCheck = ({ isAuthenticated, onNext, loading }: AuthCheckProps) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    // Simulate login process
    setTimeout(() => {
      if (loginData.email && loginData.password) {
        toast.success('¡Inicio de sesión exitoso!');
        onNext();
      } else {
        toast.error('Por favor completa todos los campos');
      }
      setIsLoggingIn(false);
    }, 1500);
  };

  const handleLoginInputChange = (field: keyof LoginFormData, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegisterInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setIsRegistering(false);
      return;
    }

    // Validate terms acceptance
    if (!registerData.acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      setIsRegistering(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      if (registerData.firstName && registerData.lastName && registerData.email && registerData.password) {
        toast.success('¡Cuenta creada exitosamente!');
        onNext();
      } else {
        toast.error('Por favor completa todos los campos requeridos');
      }
      setIsRegistering(false);
    }, 2000);
  };

  if (isAuthenticated) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-secondary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">¡Bienvenido de nuevo!</h3>
              <p className="text-muted-foreground">
                Tu sesión está activa. Continúa con tu compra.
              </p>
            </div>

            <Button
              size="lg"
              variant="accent"
              onClick={onNext}
              disabled={loading}
            >
              Continuar al Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Register Form View
  if (showRegisterForm) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRegisterForm(false)}
              className="p-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-accent" />
            </div>
            <CardTitle>Crear Cuenta</CardTitle>
          </div>
          <CardDescription>
            Completa tus datos para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Tu nombre"
                  value={registerData.firstName}
                  onChange={(e) => handleRegisterInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Tu apellido"
                  value={registerData.lastName}
                  onChange={(e) => handleRegisterInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registerEmail">Correo electrónico</Label>
              <Input
                id="registerEmail"
                type="email"
                placeholder="tu@email.com"
                value={registerData.email}
                onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+58 412 123 4567"
                value={registerData.phone}
                onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registerPassword">Contraseña</Label>
              <Input
                id="registerPassword"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={registerData.password}
                onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                value={registerData.confirmPassword}
                onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={registerData.acceptTerms}
                onChange={(e) => handleRegisterInputChange('acceptTerms', e.target.checked)}
                className="rounded border-gray-300"
                required
              />
              <Label htmlFor="acceptTerms" className="text-sm">
                Acepto los{' '}
                <a href="#" className="text-accent hover:underline">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-accent hover:underline">
                  política de privacidad
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isRegistering}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isRegistering ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setShowRegisterForm(false)}
              className="text-sm"
            >
              ← Volver a las opciones
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Login Form View
  if (showLoginForm) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLoginForm(false)}
              className="p-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Iniciar Sesión</CardTitle>
          </div>
          <CardDescription>
            Ingresa tus credenciales para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={loginData.email}
                onChange={(e) => handleLoginInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                value={loginData.password}
                onChange={(e) => handleLoginInputChange('password', e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoggingIn}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setShowLoginForm(false)}
              className="text-sm"
            >
              ← Volver a las opciones
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Login Card */}
      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Ya tengo cuenta</CardTitle>
          </div>
          <CardDescription>
            Inicia sesión para continuar con tu compra
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            variant="default"
            className="w-full"
            disabled={loading}
            onClick={() => setShowLoginForm(true)}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Iniciar Sesión
          </Button>
          
          <div className="mt-4 text-sm text-muted-foreground space-y-2">
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-secondary" />
              Acceso rápido a tu historial
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-secondary" />
              Direcciones guardadas
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-secondary" />
              Métodos de pago guardados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Register Card */}
      <Card className="border-2 hover:border-accent/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-accent" />
            </div>
            <CardTitle>Nueva cuenta</CardTitle>
          </div>
          <CardDescription>
            Regístrate para comenzar a comprar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            variant="accent"
            className="w-full"
            disabled={loading}
            onClick={() => setShowRegisterForm(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Crear Cuenta
          </Button>

          <div className="mt-4 text-sm text-muted-foreground space-y-2">
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Registro rápido y seguro
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Acceso a ofertas exclusivas
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              Sin costo de membresía
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
