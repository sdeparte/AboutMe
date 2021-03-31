<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TypeRepository")
 */
class Type
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titleKey;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Svg", inversedBy="types")
     */
    private $svgs;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Creation", mappedBy="type")
     */
    private $creations;

    public function __construct()
    {
        $this->svgs = new ArrayCollection();
        $this->creations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitleKey(): ?string
    {
        return $this->titleKey;
    }

    public function setTitleKey(string $titleKey): self
    {
        $this->titleKey = $titleKey;

        return $this;
    }

    /**
     * @return Collection|svg[]
     */
    public function getSvgs(): Collection
    {
        return $this->svgs;
    }

    public function addSvg(svg $svg): self
    {
        if (!$this->svgs->contains($svg)) {
            $this->svgs[] = $svg;
        }

        return $this;
    }

    public function removeSvg(svg $svg): self
    {
        if ($this->svgs->contains($svg)) {
            $this->svgs->removeElement($svg);
        }

        return $this;
    }

    /**
     * @return Collection|Creation[]
     */
    public function getCreations(): Collection
    {
        return $this->creations;
    }

    public function addCreation(Creation $creation): self
    {
        if (!$this->creations->contains($creation)) {
            $this->creations[] = $creation;
            $creation->setType($this);
        }

        return $this;
    }

    public function removeCreation(Creation $creation): self
    {
        if ($this->creations->contains($creation)) {
            $this->creations->removeElement($creation);
            // set the owning side to null (unless already changed)
            if ($creation->getType() === $this) {
                $creation->setType(null);
            }
        }

        return $this;
    }
}
