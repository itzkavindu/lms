    import express from 'express';
    import { getCertificateFormData, createCertificateRequest, getCertificateRequests , toggleCertificateStatus, deleteCertificateRequest} from "../controllers/certificateController.js";



    const router = express.Router();

    router.get ('/', getCertificateFormData); // For fetching form data for certificate requests
router.get ('/all', getCertificateRequests);
router.put('/certificates/:id/toggle', toggleCertificateStatus);
router.delete('/:id', deleteCertificateRequest);



    router.post('/', createCertificateRequest);

    export default router;
