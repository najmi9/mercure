<?php

namespace App\Controller;

use App\Mercure\SubscriptionTokenProvider;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app_home", methods={"GET"})
     */
    public function index(SubscriptionTokenProvider $subscriptionTokenProvider): Response
    {
        return $this->render('app/index.html.twig', [
            'controller_name' => 'AppController',
            'subscription_token' => $subscriptionTokenProvider->getJwt(),
        ]);
    }

    /**
     * @Route("/push-update", name="app_push_updates", methods={"GET"})
     */
    public function pushUpdate(MessageBusInterface $messageBus): JsonResponse
    {
        $dataSample = ['id' => 2, 'name' => 'Imad'];
        $topicSample = '/foo';

        $messageBus->dispatch(
            new Update(
                [$topicSample],
                json_encode($dataSample),
                true
            )
        );

        return $this->json([], Response::HTTP_OK);
    }
}
