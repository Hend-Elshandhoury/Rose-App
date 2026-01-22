// import { sessionManager } from "@/lib/utils/session-manager";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const {} = useMutation({
    mutationFn: async (fields) => {
      // Set session persistence based on Remember Me checkbox (to do the rest of the functionality)
      // const sessionType = fields.rememberMe ? "persistent" : "temporary";
      // sessionManager.setSessionType(sessionType);

      return;
    },
  });

  return {};
}
