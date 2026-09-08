REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.claim_first_admin() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;