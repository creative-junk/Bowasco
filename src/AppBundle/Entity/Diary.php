<?php
/*********************************************************************************
 * Developed by Maxx Ng'ang'a
 * (C) 2017 Crysoft Dynamics Ltd
 * Karbon V 2.1
 * User: Maxx
 * Date: 9/27/2017
 * Time: 5:22 PM
 ********************************************************************************/

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="diary")
 */
class Diary
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="string")
     */
    private $id;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Affiliates")
     */
    private $receivedFrom;

    /**
     * @ORM\Column(type="string")
     */
    private $nrLitres;
    /**
     * @ORM\Column(type="string")
     */
    private $pricePerLitre;
    /**
     * @ORM\Column(type="string")
     */
    private $receivedOn;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     */
    private $receivedBy;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getReceivedFrom()
    {
        return $this->receivedFrom;
    }

    /**
     * @param mixed $receivedFrom
     */
    public function setReceivedFrom($receivedFrom)
    {
        $this->receivedFrom = $receivedFrom;
    }

    /**
     * @return mixed
     */
    public function getNrLitres()
    {
        return $this->nrLitres;
    }

    /**
     * @param mixed $nrLitres
     */
    public function setNrLitres($nrLitres)
    {
        $this->nrLitres = $nrLitres;
    }

    /**
     * @return mixed
     */
    public function getPricePerLitre()
    {
        return $this->pricePerLitre;
    }

    /**
     * @param mixed $pricePerLitre
     */
    public function setPrice($pricePerLitre)
    {
        $this->price = $pricePerLitre;
    }

    /**
     * @return mixed
     */
    public function getReceivedOn()
    {
        return $this->receivedOn;
    }

    /**
     * @param mixed $receivedOn
     */
    public function setReceivedOn($receivedOn)
    {
        $this->receivedOn = $receivedOn;
    }

    /**
     * @return mixed
     */
    public function getReceivedBy()
    {
        return $this->receivedBy;
    }

    /**
     * @param mixed $receivedBy
     */
    public function setReceivedBy($receivedBy)
    {
        $this->receivedBy = $receivedBy;
    }

}