export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            color: {
                Row: {
                    hex: string;
                    id: number;
                    immutable: boolean;
                };
                Insert: {
                    hex: string;
                    id?: number;
                    immutable?: boolean;
                };
                Update: {
                    hex?: string;
                    id?: number;
                    immutable?: boolean;
                };
                Relationships: [];
            };
            color_profile: {
                Row: {
                    hexes: string;
                    id: number;
                    immutable: boolean;
                };
                Insert: {
                    hexes: string;
                    id?: number;
                    immutable?: boolean;
                };
                Update: {
                    hexes?: string;
                    id?: number;
                    immutable?: boolean;
                };
                Relationships: [];
            };
            color_theme: {
                Row: {
                    gradient_class: string | null;
                    name: string;
                    text_class: string | null;
                };
                Insert: {
                    gradient_class?: string | null;
                    name: string;
                    text_class?: string | null;
                };
                Update: {
                    gradient_class?: string | null;
                    name?: string;
                    text_class?: string | null;
                };
                Relationships: [];
            };
            device: {
                Row: {
                    color_theme: string;
                    id: string;
                    ip: string;
                    name: string;
                    settings_json: string | null;
                    type: string;
                };
                Insert: {
                    color_theme: string;
                    id?: string;
                    ip: string;
                    name: string;
                    settings_json?: string | null;
                    type: string;
                };
                Update: {
                    color_theme?: string;
                    id?: string;
                    ip?: string;
                    name?: string;
                    settings_json?: string | null;
                    type?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "device_color_theme_fkey";
                        columns: ["color_theme"];
                        isOneToOne: false;
                        referencedRelation: "color_theme";
                        referencedColumns: ["name"];
                    },
                    {
                        foreignKeyName: "device_type_fkey";
                        columns: ["type"];
                        isOneToOne: false;
                        referencedRelation: "device_type";
                        referencedColumns: ["name"];
                    },
                ];
            };
            device_type: {
                Row: {
                    name: string;
                };
                Insert: {
                    name: string;
                };
                Update: {
                    name?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
      ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
      ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
      ? PublicSchema["Enums"][PublicEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
      ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;
