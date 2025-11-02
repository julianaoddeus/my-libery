import * as React from "react"
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";

export function ToggleSidebarButton({ isOpen, onClick }: { isOpen?: boolean, onClick?: () => void }) {
 
  return (
    <div className="top-4 left-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="text-foreground hover:text-primary"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>           
    </div>
  );
}