import { useState } from 'react';
import { ArrowLeft, Leaf, Users, Heart, Building, GraduationCap, PiggyBank, CheckCircle, Mail, Phone, MapPin, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Header } from '@/components/marketplace/Header';
import { toast } from 'sonner';
import logoLight from '@/assets/logo-light.png';

interface PartnerFormData {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  organizationType: string;
  location: string;
  website?: string;
  description: string;
  capacity: string;
  needs: string;
}

export default function KaneySostenible() {
  const [formData, setFormData] = useState<PartnerFormData>({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: '',
    location: '',
    website: '',
    description: '',
    capacity: '',
    needs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBottomDialogOpen, setIsBottomDialogOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bottomScrollPosition, setBottomScrollPosition] = useState(0);

  const handleInputChange = (field: keyof PartnerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (open) {
      // Guardar la posición actual del scroll cuando se abre el diálogo
      setScrollPosition(window.scrollY);
    } else {
      // Restaurar la posición del scroll cuando se cierra el diálogo
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    }
    setIsDialogOpen(open);
  };

  const handleBottomDialogOpenChange = (open: boolean) => {
    if (open) {
      // Guardar la posición actual del scroll cuando se abre el diálogo de abajo
      setBottomScrollPosition(window.scrollY);
    } else {
      // Restaurar la posición del scroll cuando se cierra el diálogo de abajo
      setTimeout(() => {
        window.scrollTo(0, bottomScrollPosition);
      }, 100);
    }
    setIsBottomDialogOpen(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('¡Gracias por tu interés! Te contactaremos pronto para formar parte del Portal KANEY Sostenible.');
      setIsSubmitting(false);
      // Cerrar ambos diálogos si están abiertos
      if (isDialogOpen) {
        handleDialogOpenChange(false);
      }
      if (isBottomDialogOpen) {
        handleBottomDialogOpenChange(false);
      }
      setFormData({
        organizationName: '',
        contactName: '',
        email: '',
        phone: '',
        organizationType: '',
        location: '',
        website: '',
        description: '',
        capacity: '',
        needs: ''
      });
    }, 2000);
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('como-funciona');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: <Leaf className="h-8 w-8 text-white" />,
      title: "Reducción del Desperdicio",
      description: "Transformamos productos no aptos para consumo humano en recursos valiosos para otras organizaciones."
    },
    {
      icon: <Heart className="h-8 w-8 text-white" />,
      title: "Impacto Social",
      description: "Apoyamos a ONGs, instituciones educativas y santuarios con donaciones de alimentos."
    },
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: "Sostenibilidad Ambiental",
      description: "Contribuimos a un ecosistema más sostenible y responsable con el medio ambiente."
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Red de Colaboración",
      description: "Conectamos organizaciones que comparten valores de sostenibilidad y responsabilidad social."
    }
  ];

  const partnerTypes = [
    { value: "granja-porcina", label: "Granja Porcina", icon: <PiggyBank className="h-8 w-8 text-white" /> },
    { value: "ong", label: "ONG", icon: <Heart className="h-8 w-8 text-white" /> },
    { value: "institucion-educativa", label: "Institución Educativa", icon: <GraduationCap className="h-8 w-8 text-white" /> },
    { value: "santuario", label: "Santuario/Zoológico", icon: <Building className="h-8 w-8 text-white" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden" style={{ backgroundColor: '#16423c' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Header with Icon and Title */}
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: '#6a9c89' }}></div>
                <div className="relative p-4 rounded-full" style={{ backgroundColor: '#6a9c89' }}>
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #c4dad2, #e9efec)' }}>
                  KANEY SOSTENIBLE
                </h1>
                <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundImage: 'linear-gradient(to right, #c4dad2, #e9efec)' }}></div>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto" style={{ color: '#c4dad2' }}>
              Identificamos y clasificamos productos no aptos para consumo humano para redirigirlos a organizaciones 
              que puedan aprovecharlos de forma responsable y sostenible.
            </p>
            <p className="text-2xl md:text-3xl font-bold mb-12 leading-relaxed max-w-4xl mx-auto" style={{ color: '#e9efec' }}>
              Nada se desecha, todo se transforma.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-10 py-4 text-white shadow-2xl transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: '#ff751f' }}>
                    <Users className="h-6 w-6 mr-3" />
                    Quiero Formar Parte
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Únete al Portal KANEY Sostenible</DialogTitle>
                    <DialogDescription>
                      Completa el formulario para que tu organización pueda recibir donaciones de productos 
                      no aptos para consumo humano.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organizationName">Nombre de la Organización *</Label>
                        <Input
                          id="organizationName"
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange('organizationName', e.target.value)}
                          placeholder="Ej: Granja El Porvenir"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Nombre del Contacto *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          placeholder="Ej: Juan Pérez"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="contacto@organizacion.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+58 412 123 4567"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizationType">Tipo de Organización *</Label>
                      <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de organización" />
                        </SelectTrigger>
                        <SelectContent>
                          {partnerTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                {type.icon}
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Ubicación *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Ciudad, Estado"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Sitio Web (Opcional)</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://www.organizacion.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción de la Organización *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe brevemente qué hace tu organización y cómo podría beneficiarse de recibir donaciones de productos agrícolas."
                        required
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacidad de Recepción *</Label>
                      <Textarea
                        id="capacity"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        placeholder="Describe la capacidad de tu organización para recibir y procesar donaciones (cantidad, frecuencia, tipos de productos, etc.)"
                        required
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="needs">Necesidades Específicas</Label>
                      <Textarea
                        id="needs"
                        value={formData.needs}
                        onChange={(e) => handleInputChange('needs', e.target.value)}
                        placeholder="Describe qué tipos de productos agrícolas serían más útiles para tu organización."
                        rows={2}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-4 border-2 text-white transition-all duration-300 hover:bg-white/10" 
                style={{ borderColor: '#c4dad2', color: '#c4dad2' }}
                onClick={scrollToHowItWorks}
              >
                <ChevronDown className="h-6 w-6 mr-3" />
                Más Información
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="como-funciona" style={{ backgroundColor: '#e9efec' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#16423c' }}>
              ¿Cómo Funciona?
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6a9c89' }}>
              Nuestro proceso garantiza que cada producto tenga un propósito útil, 
              reduciendo el desperdicio alimentario y creando un impacto positivo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full h-0.5" style={{ backgroundImage: 'linear-gradient(to right, transparent, #c4dad2, transparent)' }}></div>
            
            <Card className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 backdrop-blur-sm" style={{ backgroundColor: '#c4dad2' }}>
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" style={{ backgroundColor: '#6a9c89' }}></div>
                    <div className="relative p-4 rounded-full shadow-lg" style={{ backgroundColor: '#6a9c89' }}>
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold" style={{ color: '#16423c' }}>1. Identificación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed" style={{ color: '#16423c' }}>
                  Clasificamos productos no aptos para consumo humano durante nuestro proceso de control de calidad.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 backdrop-blur-sm" style={{ backgroundColor: '#c4dad2' }}>
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" style={{ backgroundColor: '#6a9c89' }}></div>
                    <div className="relative p-4 rounded-full shadow-lg" style={{ backgroundColor: '#6a9c89' }}>
                      <Users className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold" style={{ color: '#16423c' }}>2. Redirección</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed" style={{ color: '#16423c' }}>
                  Conectamos estos productos con organizaciones que pueden aprovecharlos de forma responsable.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 backdrop-blur-sm" style={{ backgroundColor: '#c4dad2' }}>
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" style={{ backgroundColor: '#ff751f' }}></div>
                    <div className="relative p-4 rounded-full shadow-lg" style={{ backgroundColor: '#ff751f' }}>
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold" style={{ color: '#16423c' }}>3. Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed" style={{ color: '#16423c' }}>
                  Cada producto encuentra su propósito, reduciendo desperdicio y creando valor social.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{ backgroundColor: '#c4dad2' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#16423c' }}>
              Beneficios del Portal
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6a9c89' }}>
              Nuestro compromiso con la sostenibilidad genera múltiples beneficios 
              para el ecosistema y la sociedad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 backdrop-blur-sm" style={{ backgroundColor: '#e9efec' }}>
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="relative p-4 rounded-full" style={{ backgroundColor: '#6a9c89' }}>
                        {benefit.icon}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold" style={{ color: '#16423c' }}>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed" style={{ color: '#16423c' }}>
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Types Section */}
      <div style={{ backgroundColor: '#e9efec' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#16423c' }}>
              Organizaciones que Pueden Participar
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6a9c89' }}>
              Diversas organizaciones pueden beneficiarse de nuestro portal de donaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerTypes.map((type) => (
              <Card key={type.value} className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 backdrop-blur-sm" style={{ backgroundColor: '#c4dad2' }}>
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="relative p-4 rounded-full" style={{ backgroundColor: '#ff751f' }}>
                        {type.icon}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold" style={{ color: '#16423c' }}>{type.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed" style={{ color: '#16423c' }}>
                    {type.value === "granja-porcina" && "Alimentación para animales de granja con productos agrícolas no aptos para consumo humano."}
                    {type.value === "ong" && "Apoyo a programas de alimentación y desarrollo comunitario."}
                    {type.value === "institucion-educativa" && "Recursos para investigación, enseñanza y programas de extensión."}
                    {type.value === "santuario" && "Alimentación para animales en santuarios y zoológicos."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#6a9c89' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight text-white">
              ¿Listo para Hacer la Diferencia?
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed">
              Únete a nuestra red de organizaciones comprometidas con la sostenibilidad 
              y el aprovechamiento responsable de recursos.
            </p>
            
            <Dialog open={isBottomDialogOpen} onOpenChange={handleBottomDialogOpenChange}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-xl px-12 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold" style={{ backgroundColor: '#ff751f', color: 'white' }}>
                  <Users className="h-8 w-8 mr-4" />
                  Formar Parte Ahora
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center" style={{ color: '#16423c' }}>
                    Únete a KANEY Sostenible
                  </DialogTitle>
                  <DialogDescription className="text-center text-muted-foreground">
                    Completa el formulario para formar parte de nuestra red de organizaciones comprometidas con la sostenibilidad.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationName">Nombre de la Organización *</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        placeholder="Ej: Fundación Verde"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Nombre del Contacto *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        placeholder="Ej: María González"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="contacto@organizacion.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+58 412 123 4567"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizationType">Tipo de Organización *</Label>
                      <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ong">ONG</SelectItem>
                          <SelectItem value="fundacion">Fundación</SelectItem>
                          <SelectItem value="cooperativa">Cooperativa</SelectItem>
                          <SelectItem value="empresa">Empresa Social</SelectItem>
                          <SelectItem value="gobierno">Gobierno</SelectItem>
                          <SelectItem value="universidad">Universidad</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Ubicación *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Ciudad, Estado"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Sitio Web (opcional)</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.organizacion.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descripción de la Organización *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe brevemente tu organización y su misión..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Capacidad de Procesamiento</Label>
                      <Textarea
                        id="capacity"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        placeholder="Describe tu capacidad de procesamiento..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="needs">Necesidades Específicas</Label>
                      <Textarea
                        id="needs"
                        value={formData.needs}
                        onChange={(e) => handleInputChange('needs', e.target.value)}
                        placeholder="Describe tus necesidades específicas..."
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                      style={{ backgroundColor: '#ff751f' }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleBottomDialogOpenChange(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center md:text-left">
              <img src={logoLight} alt="Kaney" className="h-12 mb-6 mx-auto md:mx-0" />
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Conectando productores agrícolas con tu negocio
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-6 text-xl">Enlaces</h4>
              <ul className="space-y-3 text-primary-foreground/80">
                <li className="hover:text-primary-foreground transition-colors cursor-pointer text-lg">
                  Sobre Nosotros
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer text-lg">
                  Cómo Funciona
                </li>
                <li className="hover:text-primary-foreground transition-colors cursor-pointer text-lg">
                  Términos y Condiciones
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-6 text-xl">Contacto</h4>
              <ul className="space-y-3 text-primary-foreground/80">
                <li className="text-lg">contacto@kaney.com</li>
                <li className="text-lg">+58 412 1234567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-primary-foreground/60 text-lg">
              &copy; 2024 KANEY. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
