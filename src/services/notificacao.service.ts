import { ApiService } from "./api.service";

class NotificacaoService extends ApiService {
  async patchNotificacaoUsuario(notificacao: boolean) {
    return this.patch(`/usuario/notificacao?notificacao=${notificacao}`, {});
  }
}

export default new NotificacaoService();
