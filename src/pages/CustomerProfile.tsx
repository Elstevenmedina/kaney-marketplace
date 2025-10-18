import { TabsContent } from '@/components/ui/tabs';
import { MyPurchases } from '@/components/profile/MyPurchases';
import { AddressManagement } from '@/components/profile/AddressManagement';
import ProfileLayout from './Profile';

export default function CustomerProfile() {
  return (
    <ProfileLayout>
      <MyPurchases />
      <AddressManagement />
      
      {/* Information Tab */}
      <TabsContent value="information">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">Información Personal</h3>
          <p className="text-muted-foreground">Próximamente</p>
        </div>
      </TabsContent>

      {/* Refunds Tab */}
      <TabsContent value="refunds">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">Reintegros</h3>
          <p className="text-muted-foreground">Próximamente</p>
        </div>
      </TabsContent>

      {/* Support Tab */}
      <TabsContent value="support">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">Soporte</h3>
          <p className="text-muted-foreground">Próximamente</p>
        </div>
      </TabsContent>
    </ProfileLayout>
  );
}
