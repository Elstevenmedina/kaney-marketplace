import { useState } from 'react';
import { ArrowLeft, Truck, Shield, FileCheck, Award, Clock, Star, Users, Phone, Mail, LogIn } from 'lucide-react';
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

interface TransportistaFormData {
  nombreCompleto: string;
  email: string;
  telefono: string;
  empresa: string;
  tipoVehiculo: string;
  capacidadCarga: string;
  tieneRefrigeracion: string;
  experiencia: string;
  ubicacion: string;
  disponibilidad: string;
  mensaje: string;
}

export default function TransportistasCertificados() {
  const [formData, setFormData] = useState<TransportistaFormData>({
    nombreCompleto: '',
    email: '',
    telefono: '',
    empresa: '',
    tipoVehiculo: '',
    capacidadCarga: '',
    tieneRefrigeracion: '',
    experiencia: '',
    ubicacion: '',
    disponibilidad: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (field: keyof TransportistaFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('¡Gracias por tu interés! Te contactaremos pronto para iniciar el proceso de certificación.');
      setIsSubmitting(false);
      setIsDialogOpen(false);
      setFormData({
        nombreCompleto: '',
        email: '',
        telefono: '',
        empresa: '',
        tipoVehiculo: '',
        capacidadCarga: '',
        tieneRefrigeracion: '',
        experiencia: '',
        ubicacion: '',
        disponibilidad: '',
        mensaje: ''
      });
    }, 2000);
  };

  const certificationSteps = [
    {
      step: 1,
      icon: <FileCheck className="h-8 w-8 text-white" />,
      title: "Verificación de Documentación",
      description: "Revisión completa de seguros, permisos y documentación legal en regla."
    },
    {
      step: 2,
      icon: <Truck className="h-8 w-8 text-white" />,
      title: "Inspección del Vehículo",
      description: "Evaluación técnica del estado y condiciones del vehículo de transporte."
    },
    {
      step: 3,
      icon: <Star className="h-8 w-8 text-white" />,
      title: "Verificación de Reputación",
      description: "Análisis de referencias y historial de servicio con otros clientes."
    },
    {
      step: 4,
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Capacitación KANEY",
      description: "Formación en el uso de la plataforma y protocolos de calidad."
    }
  ];

  const certificationBenefits = [
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Confianza Garantizada",
      description: "Nuestros clientes saben que trabajan con transportistas verificados y certificados."
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Certificación Oficial",
      description: "Recibe tu certificado oficial de Transportista Certificado KANEY."
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Acceso Preferencial",
      description: "Prioridad en asignación de rutas y acceso a clientes premium."
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Soporte 24/7",
      description: "Asistencia técnica y soporte continuo para optimizar tus operaciones."
    }
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
                <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: '#ff751f' }}></div>
                <div className="relative p-4 rounded-full" style={{ backgroundColor: '#ff751f' }}>
                  <Truck className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #c4dad2, #e9efec)' }}>
                  TRANSPORTISTAS KANEY
                </h1>
                <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundImage: 'linear-gradient(to right, #c4dad2, #e9efec)' }}></div>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto" style={{ color: '#c4dad2' }}>
              No trabajamos con cualquiera. Creamos un programa de certificación riguroso para garantizar 
              la calidad y confiabilidad de nuestra red logística.
            </p>
            <p className="text-2xl md:text-3xl font-bold mb-12 leading-relaxed max-w-4xl mx-auto" style={{ color: '#e9efec' }}>
              Calidad garantizada desde el campo hasta tu mesa.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-10 py-4 text-white shadow-2xl transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: '#ff751f' }}>
                    <Truck className="h-6 w-6 mr-3" />
                    Solicitar Certificación
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Solicitar Certificación KANEY</DialogTitle>
                    <DialogDescription>
                      Completa el formulario para iniciar tu proceso de certificación como transportista KANEY.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombreCompleto">Nombre Completo *</Label>
                        <Input
                          id="nombreCompleto"
                          value={formData.nombreCompleto}
                          onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                          placeholder="Ej: Juan Pérez"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="juan@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          value={formData.telefono}
                          onChange={(e) => handleInputChange('telefono', e.target.value)}
                          placeholder="+58 412 123 4567"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="empresa">Empresa</Label>
                        <Input
                          id="empresa"
                          value={formData.empresa}
                          onChange={(e) => handleInputChange('empresa', e.target.value)}
                          placeholder="Transportes El Campo S.A."
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tipoVehiculo">Tipo de Vehículo *</Label>
                        <Select value={formData.tipoVehiculo} onValueChange={(value) => handleInputChange('tipoVehiculo', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="camion-pequeno">Camión Pequeño</SelectItem>
                            <SelectItem value="camion-mediano">Camión Mediano</SelectItem>
                            <SelectItem value="camion-grande">Camión Grande</SelectItem>
                            <SelectItem value="furgon">Furgón</SelectItem>
                            <SelectItem value="pickup">Pickup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="capacidadCarga">Capacidad de Carga *</Label>
                        <Input
                          id="capacidadCarga"
                          value={formData.capacidadCarga}
                          onChange={(e) => handleInputChange('capacidadCarga', e.target.value)}
                          placeholder="Ej: 5 toneladas"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tieneRefrigeracion">¿Tiene Refrigeración? *</Label>
                        <Select value={formData.tieneRefrigeracion} onValueChange={(value) => handleInputChange('tieneRefrigeracion', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="si">Sí</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experiencia">Años de Experiencia *</Label>
                        <Input
                          id="experiencia"
                          value={formData.experiencia}
                          onChange={(e) => handleInputChange('experiencia', e.target.value)}
                          placeholder="Ej: 5 años"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ubicacion">Ubicación *</Label>
                        <Input
                          id="ubicacion"
                          value={formData.ubicacion}
                          onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                          placeholder="Ej: Caracas, Venezuela"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="disponibilidad">Disponibilidad *</Label>
                        <Select value={formData.disponibilidad} onValueChange={(value) => handleInputChange('disponibilidad', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tiempo-completo">Tiempo Completo</SelectItem>
                            <SelectItem value="medio-tiempo">Medio Tiempo</SelectItem>
                            <SelectItem value="fines-semana">Fines de Semana</SelectItem>
                            <SelectItem value="por-proyecto">Por Proyecto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="mensaje">Mensaje Adicional</Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => handleInputChange('mensaje', e.target.value)}
                        placeholder="Cuéntanos más sobre tu experiencia y por qué quieres formar parte de KANEY..."
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                      style={{ backgroundColor: '#ff751f' }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Solicitar Certificación'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-4 border-2 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Phone className="h-6 w-6 mr-3" />
                Contactar
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-4 border-2 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                onClick={() => window.open('https://logistica.kaneyconecta.com/', '_blank')}
              >
                <LogIn className="h-6 w-6 mr-3" />
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>


      {/* Process Steps */}
      <div style={{ backgroundColor: '#c4dad2' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#16423c' }}>
              Proceso de Certificación
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6a9c89' }}>
              Un proceso riguroso de 4 pasos para garantizar la calidad y confiabilidad de nuestros transportistas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificationSteps.map((step, index) => (
              <Card key={index} className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 backdrop-blur-sm" style={{ backgroundColor: '#e9efec' }}>
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                      <div className="relative p-4 rounded-full" style={{ backgroundColor: '#ff751f' }}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mb-4">
                    <Badge variant="secondary" className="text-sm font-bold px-3 py-1" style={{ backgroundColor: '#ff751f', color: 'white' }}>
                      Paso {step.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold" style={{ color: '#16423c' }}>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed" style={{ color: '#16423c' }}>
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{ backgroundColor: '#e9efec' }}>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#16423c' }}>
              Beneficios de la Certificación
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6a9c89' }}>
              Ser un Transportista Certificado KANEY te brinda múltiples ventajas y oportunidades de crecimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificationBenefits.map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 backdrop-blur-sm" style={{ backgroundColor: '#c4dad2' }}>
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

      {/* CTA Section */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#16423c' }}>
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
              ¿Listo para Ser Parte de KANEY?
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed">
              Únete a nuestra red de transportistas certificados y forma parte del ecosistema 
              logístico más confiable de Venezuela.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-xl px-12 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold" style={{ backgroundColor: '#ff751f', color: 'white' }}>
                    <Truck className="h-8 w-8 mr-4" />
                    Solicitar Certificación
                  </Button>
                </DialogTrigger>
              </Dialog>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-12 py-6 border-2 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Mail className="h-8 w-8 mr-4" />
                Más Información
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-12 py-6 border-2 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                onClick={() => window.open('https://logistica.kaneyconecta.com/', '_blank')}
              >
                <LogIn className="h-8 w-8 mr-4" />
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
