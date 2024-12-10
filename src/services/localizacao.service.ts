import { ApiService } from "./api.service";

class LocalizacaoService extends ApiService {
  async patchRaioUsuario(raio: number) {
    return this.patch(`/usuario/raio?raio=${raio}`, {});
  }
}

export default new LocalizacaoService();
