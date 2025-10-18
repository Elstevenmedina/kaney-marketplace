import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, registerUser, clearError } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessType: 'individual' as 'individual' | 'company'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    const result = await dispatch(loginUser(loginData));
    if (loginUser.fulfilled.match(result)) {
      toast.success('¡Bienvenido!');
      onSuccess?.();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
    const result = await dispatch(registerUser(registerData));
    if (registerUser.fulfilled.match(result)) {
      toast.success('¡Registro exitoso!');
      onSuccess?.();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl text-center" style={{ color: '#16423c' }}>
          Bienvenido a Kaney
        </CardTitle>
        <CardDescription className="text-center text-sm sm:text-base">
          Inicia sesión o regístrate para continuar
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 px-4 sm:px-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-1 sm:gap-2 h-auto p-1">
            <TabsTrigger value="login" className="text-xs sm:text-sm py-2 sm:py-3">
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="text-xs sm:text-sm py-2 sm:py-3">
              Registrarse
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              {error && (
                <Alert variant="destructive" className="text-xs sm:text-sm">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-xs sm:text-sm">Correo Electrónico</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-xs sm:text-sm">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Tu contraseña"
                    className="text-sm sm:text-base pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full text-sm sm:text-base" 
                disabled={loading}
                style={{ backgroundColor: '#ff751f' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
              {error && (
                <Alert variant="destructive" className="text-xs sm:text-sm">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-firstName" className="text-xs sm:text-sm">Nombre</Label>
                  <Input
                    id="register-firstName"
                    value={registerData.firstName}
                    onChange={(e) => handleRegisterInputChange('firstName', e.target.value)}
                    placeholder="Juan"
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-lastName" className="text-xs sm:text-sm">Apellido</Label>
                  <Input
                    id="register-lastName"
                    value={registerData.lastName}
                    onChange={(e) => handleRegisterInputChange('lastName', e.target.value)}
                    placeholder="Pérez"
                    className="text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-xs sm:text-sm">Correo Electrónico</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-phone" className="text-xs sm:text-sm">Teléfono</Label>
                <Input
                  id="register-phone"
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
                  placeholder="+58 412 1234567"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-businessType" className="text-xs sm:text-sm">Tipo de Negocio</Label>
                <Select 
                  value={registerData.businessType} 
                  onValueChange={(value) => handleRegisterInputChange('businessType', value)}
                >
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Persona Natural</SelectItem>
                    <SelectItem value="company">Empresa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-xs sm:text-sm">Contraseña</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-confirmPassword" className="text-xs sm:text-sm">Confirmar Contraseña</Label>
                <Input
                  id="register-confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                  placeholder="Repite tu contraseña"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full text-sm sm:text-base" 
                disabled={loading}
                style={{ backgroundColor: '#ff751f' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  'Registrarse'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
